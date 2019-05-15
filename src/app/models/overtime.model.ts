import { Projects } from "./projects.model";
import { Time } from "@angular/common";

export class OvertimeModel{
    firstname: string
    lastname: string
    project: string
    timefrom: string
    timeto: string
    date: Date
    comment: string
    totalTime: number
    userUID: string

    constructor( 
        firstname = '',
        lastname = '',
        project = '',
        timefrom = '',
        timeto = '',
        date = (new Date()).getDate,
        comment = '',
        totalTime = 0,
        userUID = ''
    ) {}
}