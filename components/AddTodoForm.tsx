import { useGetTodos } from "@/hooks/apiRequest";
import { useAlertController, useDialogController, useNoSigInSession } from "@/hooks/states";
import { ITodo } from "@/types/TodoType";
import { Autocomplete, Chip, InputLabel, MenuItem, Select, Slider, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form"
import CustomButton from "./CustomButton";
import { BsFillSendPlusFill, BsSendCheckFill } from "react-icons/bs";
import { addTodo, editTodo } from "@/lib/addTodoForm";

export const AddTodoForm = ( { editValues, todoIndex }: { editValues?: ITodo, todoIndex?: number } ) => {

    const { control, setValue, handleSubmit, reset, watch } = useForm<ITodo>({
        defaultValues: editValues ? editValues : {
            title: "",
            description: "",
            category: null,
            priority: "Média",
            progress: 0,
            completed: false,
            conclusion_date: "",
        }
    });
    const { data: session, status } = useSession();
    const userData: any = session?.user;
    const userID = userData ? userData?.id : "";
    const { setAlertProps } = useAlertController();
    const { setDialogProps } = useDialogController();
    const { refetch } = useGetTodos();

    function submitTodo(data: ITodo){
        if(editValues){
            editTodo({
                userID,
                data,
                localData: status === "authenticated" ? false : true,
                todoIndex: todoIndex!,
                refetch,
                setAlertProps,
                setDialogProps,
            })
            return
        }
        addTodo({
            userID,
            data: data.completed ? {...data, completedAt: new Date().toJSON()} : data,
            localData: status === "authenticated" ? false : true,
            refetch,
            setAlertProps,
            reset
        });
    }

    return (
        <div className={`flex flex-col w-full h-full gap-2 p-2 border border-app-palette-100 border-opacity-30 ${!editValues ? "rounded-xl" : ""}`}>

            <h1 className={`${editValues ? "text-[1.8rem]" : "text-[1.4rem]" } font-semibold flex items-center text-center self-center my-1`}>
                {editValues ? "Registre suas melhorias 🦾" : "Ainda há muito o que fazer! 💪"}
            </h1>

            <form onSubmit={handleSubmit(submitTodo)}>
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
                    defaultValue={editValues ? editValues.category : ""}
                    render={({ field }) =>
                        <Autocomplete
                        value={watch("category")}
                        isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
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
                            value={field.value}
                            required
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
                    name="conclusion_date"
                    control={control}
                    rules={{required: false}}
                    defaultValue=""
                    render={({ field }) => 
                        <>
                            <InputLabel id="conclusion_date">Data de conclusão</InputLabel>
                            <TextField
                            {...field} 
                            id="conclusion_date"
                            type="datetime-local"
                            variant="outlined" 
                            />
                        </>
                    }
                    />

                    <Controller
                    name="progress"
                    control={control}
                    render={({ field }) =>
                        <div className="flex flex-col my-2">
                            <label className="italic text-sm leading-4">Já teve algum progresso na tarefa? Coloque aqui quanto:</label>
                            <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
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
                                step={5}
                                marks={[
                                    { value: 0, label: "0%" },
                                    { value: 25, label: "25%" },
                                    { value: 50, label: "50%" },
                                    { value: 75, label: "75%" },
                                    { value: 100, label: "100%" }
                                ]}
                                aria-label="Default" 
                                valueLabelDisplay="auto"
                                color="warning"
                                />
                            </Stack>
                        </div>
                    }
                    />

                    <CustomButton
                    Text={`${editValues ? "Atualizar tarefa" : "Enviar tarefa"}`}
                    type="submit"
                    className="bg-app-palette-300 text-app-palette-100 font-semibold"
                    Icon={editValues ? BsSendCheckFill : BsFillSendPlusFill}
                    IconStyle="text-2xl text-app-palette-100"
                    />
                </div>
            </form>
        </div>
    )
}