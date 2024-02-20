export class ChatFile {
    constructor(
        name,
        id,
        url,
        type,
        assistantId,
        assistantFileId) {
        this.title = name,
        this.id = id,
        this.url = url,
        this.type = type,
        this.assistantId = assistantId,
        this.assistantFileId = assistantFileId
    }
}