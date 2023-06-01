import { useEffect, useState } from "react";
import { CommentFormValues } from "../../../../../app/models/Comment";
import { useStore } from "../../../../../app/stores/store";
import EntityForm from "../../../../common/forms/EntityForm";
import * as Yup from "yup";
import TypoLoading from "../../../../../app/layout/indicators/common/TypoLoading";

const CommentForm = () => {
  const { userStore, commentStore, postStore } = useStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1000); // Delay of 1 second (1000 milliseconds)

    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, []);

  if (!showForm) {
    return <TypoLoading />; // Show the loading component during the delay
  }

  return (
    <EntityForm<CommentFormValues>
      initialEntityFormValues={new CommentFormValues()}
      selectionFields={[]}
      validateObject={{
        content: Yup.string()
          .required("Nội dung không được bỏ trống!")
          .max(800, "Nội dung không được vượt quá 800 ký tự!"),
      }}
      excludeFields={["userId", "postId"]}
      fieldConfigs={[
        {
          fieldKey: "content",
          props: {
            label: "Nội dung",
            placeholder: "Hãy nhập nội dung!",
            textarea: true,
          },
        },
      ]}
      onSubmit={(commentFormValues) => {
        commentStore.addComment(commentFormValues);
      }}
      onSetAdditionalValues={(commentFormValues) => {
        commentFormValues.userId = userStore.user?.id;
        commentFormValues.postId = postStore.selectedItem?.id;
      }}
      onCancel={() => {}}
    ></EntityForm>
  );
};

export default CommentForm;
