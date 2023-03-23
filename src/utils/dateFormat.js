import { format } from 'date-fns'


export function dayOfWeekInPortuguese(date) {
    const dayOfWeek = format(new Date(date), 'EEEE')

    if (dayOfWeek === "Monday") {
        return "Segunda"
    }
    else if (dayOfWeek === "Tuesday") {
        return "Terça"
    }
    else if (dayOfWeek === "Wednesday") {
        return "Quarta"
    }
    else if (dayOfWeek === "Thursday") {
        return "Quinta"
    }
    else if (dayOfWeek === "Friday") {
        return "Sexta"
    }
    else if (dayOfWeek === "Sathurday") {
        return "Sábado"
    }
    else if (dayOfWeek === "Sunday") {
        return "Domingo"
    }
}


export function formatToModelDate(date) {
    return format(new Date(date), 'dd/MM/yyyy')
}



