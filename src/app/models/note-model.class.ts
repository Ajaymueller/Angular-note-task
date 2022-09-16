export class NoteModel {
    public id: number;
    public title: string = null;
    public body: string = "";
    public userId: number = 0;

    constructor(json: any = null) { ; if (json) { } }

}