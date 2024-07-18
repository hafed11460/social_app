from django.db import models
from django.utils.translation import gettext as _
from users.models import WithTimestamp

CONTRAT_TYPES = (
    ("CDD", "CDD"),
    ("CDI", "CDI"),
    ("Stage", "Stage"),
)


class Direction(WithTimestamp, models.Model):
    name = models.CharField(_("Direction Name"), max_length=100)

    def __str__(self):
        return self.name


class Employee(WithTimestamp, models.Model):
    matricule = models.IntegerField(_("Matricule"), unique=True)
    nom = models.CharField(_("Nom"), max_length=50)
    prenom = models.CharField(_("Prenom"), max_length=50)
    date_n = models.DateField(
        _("Date de Naissance"),
        auto_now=False,
        auto_now_add=False,
        null=True,
        blank=True,
    )
    date_e = models.DateField(_("Date d'entrée"), auto_now=False, auto_now_add=False,null=True, blank=True)
    poste = models.CharField(_("Poste"), max_length=255, null=True, blank=True)
    direction = models.ForeignKey(
        Direction,
        verbose_name=_("Direction"),
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
    )
    fin_contrat = models.DateField(
        _("Fin Contrat"), auto_now=False, auto_now_add=False, null=True, blank=True
    )
    type_contrat = models.CharField(
        _("Type Contrat"), max_length=50, choices=CONTRAT_TYPES
    )

    class Meta:
        verbose_name = _("Employee")
        verbose_name_plural = _("Employees")

    def __str__(self):
        return f"{self.nom} {self.prenom}"


# class Primetype(models.Model):
#     name = models.CharField(_("Name"), max_length=50)

#     def __str__(self):
#         return self.name


# class Prime(WithTimestamp, models.Model):
#     employee = models.ForeignKey(
#         Employee,
#         related_name="primes",
#         verbose_name=_("Employee"),
#         on_delete=models.DO_NOTHING,
#     )
#     prime_type = models.ForeignKey(
#         Primetype, verbose_name=_("Prime Type"), on_delete=models.DO_NOTHING
#     )
#     date_f = models.DateField(
#         _("date de fete"), auto_now=False, auto_now_add=False, null=True, blank=True
#     )
#     date_r = models.DateField(
#         _("date de reception"),
#         auto_now=False,
#         auto_now_add=False,
#         null=True,
#         blank=True,
#     )
#     montant = models.DecimalField(_("Montant"), max_digits=12, decimal_places=2)
#     observation = models.TextField(_("Observation"), null=True, blank=True)

#     def __str__(self) -> str:
#         return f"{self.employee.nom} {self.employee.prenom}"
