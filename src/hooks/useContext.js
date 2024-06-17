import { useContext } from "react";
import { ClienteContext } from "../contexts/ClienteProvider";

export default function useContexts() {
  return useContext(ClienteContext)
}