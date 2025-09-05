import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import css from "@/components/NoteForm/NoteForm.module.css"
import { useId } from "react";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface OrderFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: OrderFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title too short')
    .max(50, 'Title too long')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content too long'),
  tag: Yup.string().required('Select tag'),
});

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  const fieldId = useId();
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
            </button>
            <button
            type="submit"
            className={css.submitButton}
                               >
            Create note
            </button>
        </div>
</Form>

    </Formik>
  );
}