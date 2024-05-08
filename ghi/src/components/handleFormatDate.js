export default function handleFormatDate(dateParameter) {
    const date = dateParameter.split('-')
    return `${date[1]}/${date[2]}/${date[0]}`
}
