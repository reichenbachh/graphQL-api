import { gql } from "apollo-server-express";

export const typeDefs = gql`
    enum SkillLevel{
        beginner
        intermediate
        expert
    }

    enum Role{
        user
        publisher
    }

    type Bootcamp{
        id:ID!
        user:ID!
        name:String!
        description:String!
        website:String!
        phone:String!
        email:String!
        address:String!
        housing:Boolean!
        careers:[String!]
        jobAssistance:Boolean!
        jobGuarantee:Boolean!
    }

    type Course{
        id:ID!
        title:String!
        description:String!
        weeks:Int!
        tution:Float!
        minimumSkill:SkillLevel!
        scholarshipsAvailable:Boolean!
        bootcamp:ID!
        user:ID!
    }

    type User{
        id:ID!
        name:String!
        email:String!
        role:Role!
        password:String!
    }

    type Review{
        id:ID!
        title:String!
        text:String!
        rating:Int!
        bootcamp:ID!
        user:ID!
    }

    type Query{
        getAllBootCamps:[BootCamp!]
        getBootCamp(id:ID!)):BootCamp!
        getReview(id:ID):Review
        getReviews(id:ID!):[Review!]
        getCourses:[Course!]
    }


    type Mutation{
        createBootCamp(bootcamp:BootCamp!)
        deleteBootCamp(id:ID!)
    }
`;
