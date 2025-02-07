export const formatCurrency = (quantity: number) => {

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(quantity)

}


export const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const formater = new Intl.DateTimeFormat('es-Es', {
        month: 'long',
        day:'numeric',
        year:'numeric'
    })
    return formater.format(date)
}