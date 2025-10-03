import { useState } from "react";
import toast from "react-hot-toast";

export default function HandleValidation({
  toastLoading,
  toastSuccess,
  toastErrorServer,
  toastErrorInput,
  reset,
  FetchFuncion,
}) {
  const [formData, setFormData] = useState(null);

  const onSubmit = async (data) => {
    try {
      setFormData(data);

      toast.dismiss();
      console.log(data);
      await FetchFuncion(data);

      toast.dismiss();
      toast.success(toastSuccess);
      reset();
    } catch (error) {
      toast.error(error.message || toastErrorServer);
      console.error(error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error(toastErrorInput);
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, formData };
}
