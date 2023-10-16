import { apiUrl } from '../../../util/tmdb';

export default async (req, res) => {
    const result = await fetch(`${apiUrl}Home/config`,
        {
            method: 'post',
            headers: new Headers({
                'Authorization': `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMyMjQxRjVGNTcyMENGRjQxMEEzMzBERTQxOEVDREJEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTQwMDk4NjgsImV4cCI6MTY1NDAxMzQ2OCwiaXNzIjoiaHR0cDovL2F1dGhhcGk6ODA4Mi9hdXRoYXBpIiwiY2xpZW50X2lkIjoicGxhdGFmb3JtLWNhdGFsb2ciLCJzdWIiOiI2MjU1ZGJlZTViMzg2MTgwN2ZjYjJhMmMiLCJhdXRoX3RpbWUiOjE2NTQwMDk4NjgsImlkcCI6ImxvY2FsIiwiaWQiOiI2MjU1ZGJlZTViMzg2MTgwN2ZjYjJhMmMiLCJwcm9maWxlIjoiUGFydGljaXBhbnQiLCJlbWFpbCI6ImFuZHJlLmFyYXVqb0BkaWdpLmFnIiwibmlja25hbWUiOiJBbmRyZSIsImFiaWxpdGllcyI6Ilt7XCJhY3Rpb25cIjpcIipcIixcInN1YmplY3RcIjpcIipcIn1dIiwiY2FtcGFpZ24iOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiLCJhY2NlcHRlZENvbnNlbnRUZXJtIjoiIiwianRpIjoiMUE5OTJFNUQ1MENEODY0OENDNjBDQ0QzQjYwNkI1Q0MiLCJpYXQiOjE2NTQwMDk4NjgsInNjb3BlIjpbImNhdGFsb2ciXSwiYW1yIjpbImN1c3RvbSJdfQ.NIaojEvk4ng0AP82-qPpX44nL4W_Ua5Xp-Ye-gRdGImpy9VNX9HrnasRdhXMMaPBvlGjKmBmBwr9kJltO8UQvLeP_xvJGVoiLfnRcQnNdHpVUp0xeuWHffyI4j2M1FKwU7Rv4d2Dj83_JY89W-ZbviMtVBUCHRulBJiMjRyBeFqTvbQo3_Wi3rnvsuK85s6XMV3cdvNhOUnLwvpMb37Nlof-l9y3ADGbaPph5y2NdW9ud485XQJtz2A92PxzqDQTEmQa-LOPwdkQKMZvFCbb4FxATj9eKxws9tRHcIXD4F2dCM8LCQz06kHV4ThgYgnbeXYvSMnsx-CfcBecmZyIFQ`
            }),
        })
    res.status(200);
}
