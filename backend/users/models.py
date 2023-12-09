from django.db import models
from django.conf import settings
from django.contrib.auth.models import (BaseUserManager , AbstractBaseUser,PermissionsMixin,)
from rest_framework_simplejwt.tokens import RefreshToken
import PIL
# from rest_framework_simplejwt.tokens import RefreshToken

USER_TYPES = (
    ("VENDOR", "VENDOR"),
    ("CUSTOMER", "CUSTOMER"),
    ("SUB_ADMIN", "SUB_ADMIN"),
    ("SUPER_ADMIN", "SUPER_ADMIN"),
)

GENDER_TYPES = (
    ("MALE", "MALE"),
    ("FEMALE", "FEMALE"),
    ("OTHER", "OTHER"),
)

STATUS_CHOICES = (
    ("INVITED", "INVITED"),
    ("ACTIVE", "ACTIVE"),
    ("SUSPENDED", "SUSPENDED"),
)

class WithTimestamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True,null=True, default=None)

    class Meta:
        abstract = True

class UserManager(BaseUserManager):
    
    def create_user(self, first_name, last_name, email,role, password=None):
        if first_name is None:
            raise TypeError('User should have a firstanme')
        if last_name is None:
            raise TypeError('User should have a last_name')
        if email is None :
            raise TypeError('User should have an email')
        if role not in ['VENDOR','CUSTOMER']:
            raise TypeError({'role':'Account type is not match.'})
        
        
        email = str(email).lower()
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            role=role
        )
        user.set_password(password)
        user.save()
        # user.save(using=self._db)
        return user
    
    def create_superuser(self,first_name, last_name, email, password):
        if password is None:
            raise TypeError('Password should be not None ')
        
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
            role='VENDOR'
        )

        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True
        user.is_superadmin = True
        user.save()
        return user
    

class User(WithTimestamp,AbstractBaseUser, PermissionsMixin):
    # username = None
    manager = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)
    first_name   = models.CharField(max_length=50)
    last_name    = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True, db_index=True)
    role = models.CharField(choices=USER_TYPES,max_length=50,default='CUSTOMER')

    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


def get_profile_image_filepath(self, filename):
    return f'profile_images/{self.user.pk}/{"profile_image.png"}'


def get_default_profile_image():
    return "profile_images/default.png"




class UserProfile(WithTimestamp,models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='userprofile')
    gender= models.CharField(max_length=25,null=True,blank=True,choices=GENDER_TYPES)
    image = models.ImageField(blank=True,null=True,default=get_default_profile_image,
        upload_to=get_profile_image_filepath)
    
    def __str__(self) -> str:
        return f'{self.user.email}'
    
    # def save(self, *args, **kwargs):
    #     # image  = compress_image(self.image)
    #     # self.image = image
    #     print(self.image)
    #     if self.image != None:
    #         image = PIL.Image.open(self.image)
    #         image.save(self.image,quality=35,optimize=True)
    #     super().save(*args, **kwargs)
