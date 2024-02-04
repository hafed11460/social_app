
import http from 'features/http-common'
import { IEFilterArgs } from 'types/types.employees'
import { IPFilterArgs, IPrime, IProcesVerbal } from 'types/types.primes'

class EmployeesDataService {
    getEmployees(args:IEFilterArgs) {
        return http.get(`/employees/?${args.page ? '&page='+ args.page : 1}${args?.query ?'&'+ args.query : ''}`)
    }
    createProcesVerbal(procesVerbal:IProcesVerbal) {
        return http.post(`/primes/proces-verbal/create/`,procesVerbal)
    }
    updateProcesVerbal(procesVerbal:IProcesVerbal) {
        return http.put(`/primes/proces-verbal/${procesVerbal.id}/update/`,procesVerbal)
    }
    deleteProcesVerbal(procesId:number) {
        return http.delete(`/primes/proces-verbal/${procesId}/delete/`)
    }

    getPrimes(args: IPFilterArgs) {
        return http.get(`/primes/${args.procesId}/proces-verbal/?date=${args.date ? args.date : ''}&page=${args.page ? args.page : 1}&${args?.query ? args.query : ''}`)
    }
    
    createPrime(prime:IPrime) {
        return http.post(`/primes/create/`,prime)
    }
    updatePrime(prime:IPrime) {
        return http.put(`/primes/${prime.id}/update/`,prime)
    }
    deletePrime(primeId:number) {
        return http.delete(`/primes/${primeId}/delete/`)
    }
}

export default new EmployeesDataService()


