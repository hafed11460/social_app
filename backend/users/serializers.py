from users.models import User, UserProfile,USER_TYPES
from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

class ChangePasswordSerializer(serializers.Serializer):
    class Meta:
        model = User
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    new_password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    confirm_password = serializers.CharField(min_length=6,max_length=68,write_only=True)  

    def validate(self, attrs): 
       
        old_password = attrs.get('old_password','')
        new_password = attrs.get('new_password','')
        confirm_password = attrs.get('confirm_password','')            
        request = self.context.get('request')
        user = request.user

        print(user)
        if not user.check_password(old_password):
            raise serializers.ValidationError( {'old_password':"Wrong old password."})
        
        if new_password != confirm_password:
            raise serializers.ValidationError( {'new_password':"Passwords don't match."})   

        user.set_password(new_password)
        user.save()                                  
        return attrs
        


class UpdateUserAvatarSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    class Meta:
        model=UserProfile
        fields = ['image']

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','last_name','email']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255,min_length=10)
    password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    confirm_password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    class Meta:
        model = User
        fields = ['first_name','last_name','email','role','password','confirm_password']
      
    def validate(self, attrs):        
        role = attrs.get('role','')
        first_name = attrs.get('first_name','')
        last_name = attrs.get('last_name','')
        password = attrs.get('password','')
        confirm_password = attrs.get('confirm_password','')

        if not role:
            raise serializers.ValidationError( {'role':"This field may not be blank."})

        if password != confirm_password:
            raise serializers.ValidationError( {'password':"Passwords don't match."})
        
        if not first_name.isalnum():
            raise serializers.ValidationError({
                'first_name':'The first_name should only contain alphanumeric characters'
            })
        if not last_name.isalnum():
            raise serializers.ValidationError({
                'last_name':'The last_name should only contain alphanumeric characters'
            })
        
        if role not in ['VENDOR','CUSTOMER']:
            raise serializers.ValidationError({'role':'Account type is not match.'})

        return attrs
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')        
        email = validated_data.pop('email')
        role = validated_data.pop('role')
        password = validated_data.pop('password')

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email':'This Email is already exists.'})
        user =  User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,          
            role=role,          
            password=password            
            )
        user.role = role
        user.save()
        return user


class TokenSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=10,write_only=True)
    token = serializers.CharField(read_only=True)
    class Meta:
        read_only_fields = ['token']
        fields = ['token']

    def validate(self, attrs):
        email = attrs.get('email','')
        user = User.objects.get(email=email)
        token = RefreshToken.for_user(user).access_token
        return {
            'token':token
        }


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=10,write_only=True)
    password = serializers.CharField(max_length=68,min_length=3,write_only=True)   
    user = serializers.SerializerMethodField()
    class Meta:
        model=User   
        fields = [
            'email','password','tokens','user',        
            ]
                    
    def get_user(self, obj):
        user = User.objects.get(email=obj['email']) 
        request = self.context.get('request')
        image_url = user.userprofile.image.url
        image_url = request.build_absolute_uri(image_url) 
        data = {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'role': user.role,
                'avatar':image_url
            }          
        return data
    
    def validate(self, attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        user = auth.authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed({'error':'Incorrect email and /or password'})       
        if not user.is_active:
            raise AuthenticationFailed({'error':'Account disabled, contact admin'})
        if not user.is_verified:
            raise AuthenticationFailed({'error':'Verify your email, then try to login again'})

        request = self.context.get('request')
        image_url = user.userprofile.image.url
        image_url = request.build_absolute_uri(image_url)
        return {
            # 'first_name':user.first_name,
            # 'last_name':user.last_name,
            'email':user.email,
            # 'role':user.role,
            'tokens': user.tokens, 
            # 'image':image_url          
        }
        

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            self.fail('bad_token')
        


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)
    class Meta:
        model = User
        fields = ['token']


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    confirm_password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    token = serializers.CharField(min_length=1,write_only=True)
    uidb64 = serializers.CharField(min_length=1,write_only=True)

    class Meta:
        fields = ['password','confirm_password','token','uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            confirm_password = attrs.get('confirm_password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            if password != confirm_password:
                raise serializers.ValidationError(
                    "Passwords don't match."
                )
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('The reset link is invalid',401)

            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid',401)
        


class UpdateProfileSerializer(serializers.ModelSerializer):
    email=serializers.CharField(source='user.email',read_only=True)

    class Meta:
        model = UserProfile
        fields = ['firs_tname', 'last_name','email']
