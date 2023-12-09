from django.db.models.signals import post_save
from users.models import  User,UserProfile
from django.dispatch import receiver
# from agencies.models import Agency


@receiver(post_save, sender=User)
def create_agency(sender, instance, created, **kwargs):
    if created:
         
        # if instance.role == 'CUSTOMER':
        UserProfile.objects.create(user=instance)
        print('role',instance.role)
        print('role',instance.role)
        print('role',instance.role)
        print('role',instance.role)
        print('role',instance.role)
        # print(type(instance))
        # print(instance.first_name)
        # if instance.role == 'VENDOR':
            # Agency.objects.create(saller=instance)


# @receiver(post_save, sender=User)
# def save_agency(sender, instance, **kwargs):
#     instance.agency.save()