export default function handleFormatTime(timeParameter) {
    const timePieces = timeParameter.split(':')
    const time = `${timePieces[0]}:${timePieces[1]}`
    return time
}
