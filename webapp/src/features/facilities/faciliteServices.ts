
import { IFFilterArgs, IFacilite, ITimeline } from 'types/types.facilities'
import { CreateFaciliteFromData } from 'components/facilities/CreateFacilite'
import http from 'features/http-common'
import { CreateCommentFromData } from 'components/facilities/timeline/CreateComment'

class FaciliteDataService {
    employeeFacilities(eid:number) {
        return http.get(`/facilities/employees/${eid}/`)
    }
    getFacilities(args: IFFilterArgs) {
        return http.get(`/facilities/?date=${args.date ? args.date : ''}&page=${args.page ? args.page : 1}&${args?.query ? args.query : ''}`)
    }

    createFacilite(facilite: CreateFaciliteFromData) {
        return http.post(`/facilities/create/`, facilite)
    }

    updateFacilite(date:number,facilite:any) {       
        return http.put(`/facilities/${facilite.id}/update/?date=${date}`, facilite)
    }
    deleteFacilite(faciliteId:number) {
        return http.delete(`/facilities/${faciliteId}/delete/`)
    }

/************************************************************************************************ */
    createTimeline(timeline: ITimeline) {
        return http.post(`/facilities/timelines/create/`, timeline)
    }

    addCommentToTimeline(args:CreateCommentFromData) {        
        return http.put(`/facilities/timelines/${args.id}/comment/`, args)
    }

    updateTimeline(timeline: ITimeline) {       
        return http.put(`/facilities/timelines/${timeline.id}/update/`, timeline)
    }

    deleteTimeline(timelineId:number) {
        return http.delete(`/facilities/timelines/${timelineId}/`)
    }
}

export default new FaciliteDataService()


// class PostDataService{
//     getPosts(){
//         return http.get('/posts/')
//     }
//     getUserPosts(){
//         return http.get('/posts/user-posts/')
//     }
//     createPost(data){
//         return http.post('/posts/',data)
//     }
//     deletePost(postId){
//         return http.delete(`/posts/${postId}/`)
//     }
//     updatePost(post){
//         console.log('post updata',post)
//         return http.put(`/posts/${post.get('id')}/`,post)
//     }

//     //******** Comments ********/
//     addComment(comment){
//         return http.post('/posts-comments/',comment)
//     }
//     deleteComment(commentId){
//         return http.delete(`/posts-comments/${commentId}/`)
//     }
//     updateComment(comment){
//         return http.put(`/posts-comments/${comment.id}/`,comment)
//     }

//     //******** Likes ********/
//     addLike(comment){
//         return http.post('/posts-likes/',comment)
//     }
//     deleteLike(postId){
//         return http.delete(`/posts-likes/${postId}/`)
//     }


// }
// export default new PostDataService();
