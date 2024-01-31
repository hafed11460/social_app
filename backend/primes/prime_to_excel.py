from django.http.response import FileResponse
from .models import Prime, Primetype


import xlsxwriter
import io
from datetime import datetime, timedelta
import calendar
from xlsxwriter.utility import xl_rowcol_to_cell


class PrimeToExcel:
    def __init__(self, date,proces_id):
        self.date = date
        self.proces_id = proces_id
        self.filename = "primes.xlsx"
        self.output = io.BytesIO()
        self.workbook = xlsxwriter.Workbook(self.output)
        self.worksheet = self.workbook.add_worksheet("primes")
        self.default_row = 2
        self.row = 2
        self.col = 1
        self.worksheet.set_column(1, 10, 20)
        self.headers = [
            "Matricule",
            "Nom",
            "Prénom",
            "Type",
            "date de fete",
            "date de reception",
            "Montant",
            "OBSERVATION",
        ]

    def increment_row(self, val=1):
        self.row += val

    def write_section(self, primes, title):
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
            self.row, self.col, self.row, self.col + 7, title, title_format
        )
        self.increment_row()

        # self.worksheet.write(self.row, self.col, title, sourceCell)

        # set headers for section
        index = 0
        for head in self.headers:
            self.worksheet.write(self.row, self.col + index, head, header_format)
            index += 1
        self.increment_row()

        for prime in primes:
            # matricule
            self.worksheet.write(
                self.row, self.col, prime.employee.matricule, sourceCell
            )
            self.worksheet.write(self.row, self.col + 1, prime.employee.nom, sourceCell)
            self.worksheet.write(
                self.row, self.col + 2, prime.employee.prenom, sourceCell
            )
            self.worksheet.write(
                self.row, self.col + 3, prime.prime_type.name, sourceCell
            )
            self.worksheet.write(self.row, self.col + 4, str(prime.date_f), sourceCell)
            self.worksheet.write(self.row, self.col + 5, str(prime.date_r), sourceCell)
            self.worksheet.write(
                self.row, self.col + 6, int(prime.montant), number_format
            )
            self.worksheet.write(self.row, self.col + 7, prime.observation, sourceCell)
            self.increment_row()

        start_col = self.col + 6
        end_col = self.col + 6
        end_row = self.row - 1

        # use this formula to calculate sum of montants
        sum_formula = "=SUM({0}:{1})".format(
            xl_rowcol_to_cell(start_row, start_col), xl_rowcol_to_cell(end_row, end_col)
        )

        # write total 
        self.worksheet.merge_range(
            self.row, self.col, self.row, self.col + 5, 'Total', title_format
        )

        self.worksheet.write_formula(self.row, self.col + 6, sum_formula, number_format)
        self.increment_row(5)





    def start(self):
        # get primes with date selected 
        print(self.date)
        print(self.proces_id)
        # primes = Prime.objects.all()
        primes = Prime.objects.filter(
            proces_v__id=self.proces_id,
            # date_f__year__gte=self.date.year,
            # date_f__month__gte=self.date.month,
            # date_f__year__lte=self.date.year,
            # date_f__month__lte=self.date.month,
        )
        prime_types = Primetype.objects.all()
        for ptype in prime_types:
            filter_primes = primes.filter(prime_type=ptype.id)
            if filter_primes:
                self.write_section(filter_primes, f"PRIME DE {ptype.name}")

        self.workbook.close()
        xlsx_data = self.output.getvalue()
        return xlsx_data


# def createExcelFile(date):

# output      = io.BytesIO()
# workbook = xlsxwriter.Workbook(output)
# currentDate = datetime.strptime(date, '%Y-%m-%d')
# daysInMonth= calendar.monthrange(currentDate.year, currentDate.month)[1]

# worksheet = workbook.add_worksheet('month')
# worksheet.set_default_row(20)

# headerCell = workbook.add_format({
#     'bold': 1,
#     # 'border': 1,
#     'align': 'center',
#     'valign': 'vcenter',
#     'fg_color': '#F5F5F5'})

# sourceCell = workbook.add_format({
#     'bold': 1,
#     'border': 1,
#     'align': 'center',
#     'valign': 'vcenter',
#     'fg_color': '#F5F5F5',
#     })

# row = 4
# col = 0
# ## start  header ##########
# # set width cell
# worksheet.set_column(0, 0, 25)

# worksheet.write(3, col, 'Source Name',headerCell)
# col = 1
# ## end header ############

# col = 0
# row = 4
# sources = Source.objects.filter(user=1)
# cellColor = ['#A52A2A','#7FFF00','#6495ED','#00FFFF','#B8860B','#006400','#483D8B']
# dt = datetime.strptime(date, '%Y-%m-%d')
# for source in sources:
#     events = Event.objects.filter(
#                     source__id=source.id,
#                     date__year__gte=dt.year,
#                     date__month__gte=dt.month,
#                     date__year__lte=dt.year,
#                     date__month__lte=dt.month)
#     worksheet.write(row, col, source.name ,sourceCell)
#     col +=1
#     for day in range(1,daysInMonth+1):

#         cell_format = workbook.add_format()
#         if events.filter(date__day__exact=day).exists():
#             event = events.filter(date__day__exact=day).first()
#             cell_format = workbook.add_format({
#                 'bold': 1,
#                 'border': 1,
#                 'align': 'center',
#                 'valign': 'vcenter',
#                 'fg_color': '#F5F5F5',
#                 'bg_color': '#7FFF00',
#                 })
#             print(cellColor[event.color])
#             cell_format.set_bg_color(cellColor[event.color])
#             worksheet.write(row, col, str(day) ,cell_format)
#         else:
#             worksheet.write(row, col,'' ,sourceCell)

#         col +=1
#     col = 0
#     row +=1

# workbook.close()
# xlsx_data = output.getvalue()
# return xlsx_data
