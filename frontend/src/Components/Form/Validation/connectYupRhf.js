import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useFormWithYup(schema, options = {}) {
  return useForm({
    resolver: yupResolver(schema),
    ...options,
  });
}
