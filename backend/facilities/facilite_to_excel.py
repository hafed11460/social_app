from django.http.response import FileResponse
from facilities.models import Facilite

import xlsxwriter
import io
from datetime import datetime, timedelta
import calendar
from xlsxwriter.utility import xl_rowcol_to_cell


class FaciliteToExcel:
    def __init__(self, date):
        self.date = date
        self.filename = "facilite.xlsx"
        self.output = io.BytesIO()
        self.workbook = xlsxwriter.Workbook(self.output)
        self.worksheet = self.workbook.add_worksheet("facilite")
        self.default_row = 0
        self.row = 0
        self.col = 0
        self.worksheet.set_column(1, 10, 20)
        self.headers = [
            "Matricule",
            "Nom",
            "Prénom",
            "Date D'achat",
            "Mois",
            "Montant",
            "OBSERVATION",
        ]


    def increment_row(self, val=1):
        self.row += val

    def write_section(self, facilities, title):
        title_format = self.workbook.add_format(
            {
                "bold": 1,
                "border": 1,
                "align": "center",
                "valign": "vcenter",
                "fg_color": "yellow",
            }
        )
        header_format = self.workbook.add_format(
            {
                "bold": 1,
                "border": 1,
                "align": "center",
                "valign": "vcenter",
                "fg_color": "#48D1CC",
            }
        )
        number_format = self.workbook.add_format(
            {
                "num_format": "#,##0.00",
                "bold": 1,
                "border": 1,
            }
        )
        sourceCell = self.workbook.add_format(
            {
                "bold": 1,
                "border": 1,
                "align": "center",
                "valign": "vcenter",
                # "fg_color": "#F5F5F5",
            }
        )

        start_row = self.row

        # set title for section
        self.worksheet.merge_range(
            self.row, self.col, self.row, self.col + 5, title, title_format
        )
        self.increment_row()

        # self.worksheet.write(self.row, self.col, title, sourceCell)

        # set headers for section
        index = 0
        for head in self.headers:
            self.worksheet.write(self.row, self.col + index, head, header_format)
            index += 1
        self.increment_row()

        for facilite in facilities:
            # matricule
            timeline = facilite.timelines.filter( mois__year=self.date.year,
                mois__month=self.date.month)[0]
            print(timeline.somme)
           
            print('montant',type(timeline))
            self.worksheet.write(
                self.row, self.col, facilite.employee.matricule, sourceCell
            )
            self.worksheet.write(
                self.row, self.col + 1, facilite.employee.nom, sourceCell
            )

            self.worksheet.write(
                self.row, self.col + 2, facilite.employee.prenom, sourceCell
            )

            self.worksheet.write(
                self.row, self.col + 3, str(facilite.date_achat), sourceCell
            )
            self.worksheet.write(
                self.row, self.col + 4, str(self.date), sourceCell
            )
            self.worksheet.write(
                self.row, self.col + 5, int(timeline.somme), number_format
            )
            # self.worksheet.write(
            #     self.row, self.col + 5, facilite.observation, sourceCell
            # )
            self.increment_row()

        start_col = self.col + 5
        end_col = self.col + 5
        end_row = self.row - 1

        # use this formula to calculate sum of montants
        sum_formula = "=SUM({0}:{1})".format(
            xl_rowcol_to_cell(start_row+2, start_col), xl_rowcol_to_cell(end_row, end_col)
        )

        # write total
        self.worksheet.merge_range(
            self.row, self.col, self.row, self.col + 4, "Total", title_format
        )

        self.worksheet.write_formula(self.row, self.col + 5, sum_formula, number_format)
        self.increment_row(5)

    def start(self):
        # get primes with date selected
        print(self.date)
        # primes = Prime.objects.all()
        print(self.date.year)
        print(self.date.month)
        facilities = Facilite.objects.filter(
            # date_achat__year=self.date.year,
            timelines__mois__year=self.date.year,
            timelines__mois__month=self.date.month,
        )
        # facilities = facilities.objects.filter(
        #     proces_v__id=self.proces_id,
        #     # date_f__year__gte=self.date.year,
        #     # date_f__month__gte=self.date.month,
        #     # date_f__year__lte=self.date.year,
        #     # date_f__month__lte=self.date.month,
        # )
        print("2222222222222222222222222")
        self.write_section(facilities, f"Facilities ")

        self.workbook.close()
        xlsx_data = self.output.getvalue()
        return xlsx_data
