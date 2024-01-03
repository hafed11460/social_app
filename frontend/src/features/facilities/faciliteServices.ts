
import { IFacilite, ITimeline } from 'types/types.facilities'
import http, { api } from './http-common'

class FaciliteDataService {
    getFacilities(args: any) {
        return http.get(`/facilities/?date=${args.date ? args.date : ''}`)
    }

    createFacilite(facilite: IFacilite) {
        return http.post(`/facilities/create/`, facilite)
    }

    createTimeline(timeline: ITimeline) {
        return http.post(`/facilities/timelines/create/`, timeline)
    }

    updateTimeline(timeline: ITimeline) {
        // return api({
        //     url: `/facilities/timelines/${timeline.id}/update/`,
        //     method: 'PUT',
        //     data: timeline
        // })
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
