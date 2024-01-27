from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class PrimesPaginations(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    # max_page_size = 

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'current':self.get_page_number(self.request,self.paginate_queryset),                
            },
            'count': self.page.paginator.count,
            'pages': math.ceil (self.page.paginator.count / self.page_size),
            'results': data,
            'page_size':self.page_size
        })