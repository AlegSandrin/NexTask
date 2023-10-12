import { useAlertController } from "@/hooks/states";
import api from "@/services/api";
import { ITodo } from "@/types/TodoType";
import { Autocomplete, Button, Chip, InputLabel, MenuItem, Select, Slider, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form"

export const AddTodoForm = () => {

    const { control, setValue, handleSubmit, reset } = useForm<ITodo>({
        defaultValues: {
            title: "",
            description: "",
            category: "",
            priority: "Média",
            progress: 0,
            completed: false
        }
    });
    const { data: session } = useSession();
    const userData: any = session?.user;
    const userID = userData?.id;
    const { setAlertProps } = useAlertController();

    function onSubmit(data: ITodo) {
        api.post(`/user/create_todo/${userID}`, data)
        .then(() => {
            reset();
            setAlertProps({
                open: true,
                severity: "success",
                title: "Tudo certo.",
                message: "Tarefa registrada com sucesso!"
            })
        })
        .catch((error) => {
            console.error(error);
            setAlertProps({
                open: true,
                severity: "error",
                title: "Algo deu errado...",
                message: "Erro ao cadastrar tarefa. Tente novamente."
            })
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col p-1 gap-2">
                    <Controller
                    name="title"
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => 
                        <TextField 
                        {...field} 
                        required
                        label="Título da tarefa" 
                        variant="outlined" 
                        />
                    }
                    />

                    <Controller
                    name="description"
                    control={control}
                    render={({ field }) =>
                        <TextField 
                        {...field}
                        label="Descrição da tarefa" 
                        variant="outlined" 
                        multiline
                        />
                    }
                    />

                    <Controller
                    name="category"
                    control={control}
                    render={({ field }) =>
                        <Autocomplete
                        disablePortal
                        id="category"
                        options={["Educação", "Trabalho", "Lazer", "Outros"]}
                        renderOption={(props, option) => {
                        return (
                            <li 
                            {...props} 
                            key={option}
                            onClick={(e) => {
                                field.onChange(option);
                                props.onClick!(e);
                            }}
                            >
                            {option}
                            </li>
                        )
                        }}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} label={option} />
                            ))
                        }}
                        renderInput={(params) => 
                            <TextField
                            {...params}
                            {...field}
                            label="Categoria" 
                            variant="outlined"
                            />
                        }
                        />
                    }
                    />

                    <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => 
                        <>
                            <InputLabel id="priority">Prioridade</InputLabel>
                            <Select
                            {...field}
                            id="priority"
                            >
                                <MenuItem value="Baixa">Baixa</MenuItem>
                                <MenuItem value="Média">Média</MenuItem>
                                <MenuItem value="Alta">Alta</MenuItem>
                                <MenuItem value="Urgente">Urgente</MenuItem>
                            </Select>
                        </>
                    }
                    />

                    <Controller
                    name="progress"
                    control={control}
                    render={({ field }) =>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <label>Progresso:</label>
                            <Slider 
                            {...field}
                            onChange={(e: any) => {
                                if(e.target.value === 100){
                                    setValue("completed", true);
                                } else {
                                    setValue("completed", false);
                                }
                                field.onChange(e.target.value)
                            }}
                            defaultValue={0} 
                            aria-label="Default" 
                            valueLabelDisplay="auto"
                            />
                        </Stack>
                    }
                    />

                    <Button variant="outlined" color="secondary" type="submit">
                    Adicionar tarefa
                    </Button>
                </div>
            </form>
        </div>
    )
}