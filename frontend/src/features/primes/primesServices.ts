
import { CreateFaciliteFromData } from 'components/facilities/CreateFacilite'
import http from 'features/http-common'
import { IFFilterArgs } from 'types/types.facilities'
import { IPFilterArgs } from 'types/types.primes'

class PrimesDataService {
    getProcesVerbal() {
        return http.get(`/primes/proces-verbal/`)
    }

    getPrimes(args: IPFilterArgs) {
        return http.get(`/primes/${args.procesId}/proces-verbal/?date=${args.date ? args.date : ''}&page=${args.page ? args.page : 1}&${args?.query ? args.query : ''}`)
    }

    createFacilite(facilite: CreateFaciliteFromData) {
        return http.post(`/primes/create/`, facilite)
    }

    updateFacilite(date: number, facilite: any) {
        return http.put(`/primes/${facilite.id}/update/?date=${date}`, facilite)
    }
}

export default new PrimesDataService()


