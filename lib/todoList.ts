import { ITodo } from "@/types/TodoType";
import moment from "moment";

export function organizeData(data: any[]) {
    if(!data || data.length === 0) 
    return {
        tasks: [],
        today: [],
        pending: [],
        late: [],
        completed: []
    };

    const initialValues = {
        tasks: [],
        today: [],
        pending: [],
        late: [],
        completed: [],
    }

    const organizedData: {[group: string]: ITodo[]} = data?.reduce((acc: {[group: string]: ITodo[]}, todo: ITodo) => {
        // Separa as tarefas em grupos ("Afazeres", "Para hoje", "Pendente", "Em atraso" e "Completas")
        // OBS: (Afazeres são as tarefas que não tem data de conclusão definida)

        // Verifica a diferença de dias da data de conclusão com a data atual
        const momentDate = todo.conclusion_date ? moment(new Date(todo.conclusion_date)) : undefined;
        const today = moment(new Date());
        const diffDays = today.diff(momentDate, 'days');
        const diffHours = today.diff(momentDate, 'hours');

        if(todo.completed) {
            acc.completed.push(todo)
        }
        else if(!todo.conclusion_date) {
            acc.tasks.push(todo);
        }
        else if(diffDays === 0) {
            acc.today.push(todo)
        }
        else if(diffHours > 0) {
            acc.late.push(todo)
        } else {
            acc.pending.push(todo)
        }
        return acc;
    }, initialValues);
    
    return organizedData;
}