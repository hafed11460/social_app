from django.db import models
from django.utils.translation import gettext as _
from employees.models import Employee
from users.models import WithTimestamp


class Primetype(models.Model):
    name = models.CharField(_("Name"), max_length=50)

    def __str__(self):
        return self.name


class ProcesVerbal(WithTimestamp, models.Model):
    name = models.CharField(_("Name"), max_length=50)
    is_open = models.BooleanField(_("Is Open"),default=True)
    observation = models.TextField(_("Observation"), null=True, blank=True)

    def __str__(self):
        return f'{self.name}'
    
    
class Prime(WithTimestamp, models.Model):
    proces_v = models.ForeignKey(ProcesVerbal, verbose_name=_("Proces Verbal"), on_delete=models.CASCADE)
    employee = models.ForeignKey(
        Employee,
        related_name="primes",
        verbose_name=_("Employee"),
        on_delete=models.DO_NOTHING,
    )
    prime_type = models.ForeignKey(
        Primetype, verbose_name=_("Prime Type"), on_delete=models.DO_NOTHING
    )
    date_f = models.DateField(
        _("date de fete"), auto_now=False, auto_now_add=False, null=True, blank=True
    )
    date_r = models.DateField(
        _("date de reception"),
        auto_now=False,
        auto_now_add=False,
        null=True,
        blank=True,
    )
    montant = models.DecimalField(_("Montant"), max_digits=12, decimal_places=2)
    observation = models.TextField(_("Observation"), null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.employee.nom} {self.employee.prenom}"


