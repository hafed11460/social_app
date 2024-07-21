
import http from 'features/http-common'

class GlobalService {
    getGlobalStatistic() {
        return http.get(`/`)
    }
    
}

export default new GlobalService()


