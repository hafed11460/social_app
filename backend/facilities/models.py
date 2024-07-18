from django.db import models
from django.utils.translation import gettext as _
from users.models import WithTimestamp
from employees.models import Employee


class Facilite(WithTimestamp, models.Model):
    employee = models.ForeignKey(
        Employee,
        related_name="facilites",
        verbose_name=_("Employee"),
        on_delete=models.CASCADE,
    )
    duree = models.IntegerField(_("Duree"))
    montant = models.DecimalField(_("Montant"), max_digits=12, decimal_places=2)
    date_achat = models.DateField(_("Date Achat "), auto_now=False, auto_now_add=False)
    observation = models.TextField(_("Observation"), null=True, blank=True)
    is_completed = models.BooleanField(_("Is Completed"), default=False)
    
    @property
    def solde(self):
        return sum([item.somme for item in self.timelines.all()])
    # class Meta:
    #     unique_together = ["employee", "date_achat","is_completed"]

    def __str__(self):
        return f'{self.employee.nom} {self.employee.prenom}'


def MONTH_TYPES():
    return [(f'{r}',f'{r}') for r in range(1,13)]

class CellStyle(models.Model):
    color = models.CharField(_("Color"), max_length=10,null=True, blank=True)
    background = models.CharField(_("background"), max_length=10,null=True, blank=True)
    

class Timeline(WithTimestamp, models.Model):
    facilite = models.ForeignKey(
        Facilite,
        related_name="timelines",
        verbose_name=_("Facitite"),
        on_delete=models.CASCADE,
    )
    month = models.CharField(_("month"),choices=MONTH_TYPES(), max_length=50)
    mois = models.DateField(
        _("Mois"), auto_now=False, auto_now_add=False
    )
    somme = models.DecimalField(_("Somme"), max_digits=12, decimal_places=2)
    is_commited = models.BooleanField(_("is commit"), default=False)
    color = models.CharField(_("Color"),null=True, blank=True, max_length=10)
    background = models.CharField(_("Background"),null=True, blank=True, max_length=10)
    observation = models.TextField(_("Observation"), null=True, blank=True)
    
    class Meta:
        # unique_together = ["facilite", "mois"]
        constraints = [
            models.UniqueConstraint(fields=["facilite", "mois"], name='name of constraint'),
            # models.UniqueConstraint(fields=["field1", "field3"], name='name of secound constraint')
    ]

    def __str__(self):
        return f"{self.facilite}"

    # def save(self, *args, **kwargs):
    #     print(self.facilite.montant)
    #     print(self.facilite.duree)
    #     super().save(*args, **kwargs)
