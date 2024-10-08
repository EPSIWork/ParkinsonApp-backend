from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import urllib.parse as urlparse
from urllib.parse import parse_qs


def getPage(url):
    if url is None:
        return None
    parsed = urlparse.urlparse(url)
    if "page" not in parse_qs(parsed.query):
        return 1
    ret = parse_qs(parsed.query)['page']
    if isinstance(ret, list):
        return int(ret[0])
    elif isinstance(ret, str):
        return int(ret)
    elif isinstance(ret, int):
        return ret
    else:
        return ret


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 12

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'next_num': getPage(self.get_next_link()),
                'previous_num': getPage(self.get_previous_link())
            },
            'max_page_size': self.max_page_size,
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'data': data
        })