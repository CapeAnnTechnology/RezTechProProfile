// export interface UserMeta {
//     "name": string;
//     "prefix": string;
//     "given_name": string;
//     "middle_name": string;
//     "family_name": string;
//     "suffix": string;
// }


class UserMetaModel {
  constructor(
    public name: string,
    public given_name: string,
    public family_name: string,
    public prefix?: string,
    public middle_name?: string,
    public suffix?: string,
  ) { }
}


// export interface UserModel {
//     "_id": string;
//     "client_id": string;
//     "email": string;
//     "certificates": string[];
//     "user_metadata"?: UserMeta;
// }

class UserModel {
  constructor(
    public client_id: string,
    public email: string,
    public certificates?: string[],
    public user_metadata?: UserMetaModel,
    public _id?: string, // _id is present if editing or returning from DB
  ) { }
}


export { UserMetaModel, UserModel };



// {
//     "_id" : ObjectId("5bdf591b10e89f0700414613"),
//     "tenant" : "reztechpro",
//     "client_id" : "SJLqm1Itq4vSMmc8NhEl59AgV5zVAHTu",
//     "connection" : "RezTechProMongoDB",
//     "email" : "manager5@example.com",
//     "password" : "$2a$10$8S7GFbMp4EX5EJaso2H3/eFj3qMQ7/VhypyBov5wD8bLVfEdqThym",
//     "request_language" : "en-US,en;q=0.5",
//     "__v" : 1,
//     "certificates" : [],
//     "user_metadata" : {
//         "name" : "J.R.Smith",
//         "prefix" : "Mr.",
//         "given_name" : "James",
//         "middle_name" : "Ralph",
//         "family_name" : "Smith",
//         "suffix" : "Jr."
//     }
// }
