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

    class Meta:
        unique_together = ["employee", "date_achat","is_completed"]

    def __str__(self):
        return self.employee.nom


def MONTH_TYPES():
    return [(f'{r}',f'{r}') for r in range(1,13)]


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
    
    class Meta:
        unique_together = ["facilite", "mois"]

    def __str__(self):
        return f"{self.facilite}"

    def save(self, *args, **kwargs):
        print(self.facilite.montant)
        print(self.facilite.duree)
        super().save(*args, **kwargs)
