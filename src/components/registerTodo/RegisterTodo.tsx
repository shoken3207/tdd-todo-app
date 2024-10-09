import { SubmitHandler, useForm } from "react-hook-form";
import { InputTodo, InputTodoSchema } from "../../schemas/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseTodo } from "../../hooks/useTodo";
import styled from "styled-components";

const RegisterTodo = ({ add }: { add: ReturnType<UseTodo>["add"] }) => {
  const today = new Date().toISOString().split("T")[0];
  const {
    handleSubmit,
    register,
    formState: { errors: formatError, isValid, isSubmitting },
    reset,
  } = useForm<InputTodo>({
    mode: "onChange",
    resolver: zodResolver(InputTodoSchema),
    defaultValues: {
      dueDate: today,
    },
  });
  const handleOnSubmit: SubmitHandler<InputTodo> = async (data) => {
    console.log("called");
    try {
      add(data);
      reset();
    } catch {
      alert("エラーが発生しました");
    }
  };

  return (
    <SForm
      onSubmit={(event) => {
        void handleSubmit(handleOnSubmit)(event);
      }}
    >
      <div>
        <label htmlFor="title">タイトル</label>
        <SInput
          id="title"
          type="text"
          placeholder="晩御飯の食材を買いに行く"
          {...register("title")}
        />
        {formatError.title && <p>{formatError.title.message}</p>}
      </div>
      <div>
        <label htmlFor="dueDate">締切日</label>
        <SInput id="dueDate" type="date" {...register("dueDate")} />
        {formatError.dueDate && <p>{formatError.dueDate.message}</p>}
      </div>
      <div>
        <label htmlFor="description">詳細</label>
        <STextarea
          id="description"
          placeholder="鶏もも肉、じゃがいも、にんじん・・・"
          cols={30}
          rows={10}
          {...register("description")}
        ></STextarea>
        {formatError.description && <p>{formatError.description.message}</p>}
      </div>
      <button type="submit" disabled={!isValid || isSubmitting}>
        登録する
      </button>
    </SForm>
  );
};

export default RegisterTodo;

const SInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline-color: skyblue;
`;

const STextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline-color: skyblue;
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
`;
