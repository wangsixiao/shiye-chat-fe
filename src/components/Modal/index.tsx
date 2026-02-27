import { createPortal } from "react-dom";
import "./index.css";

interface IProps {
  mountNode: string;
  visible: boolean;
}

export default function Modal(props: IProps) {
  const { mountNode, visible } = props || {};

  const targetNode: any = mountNode ? document.querySelector(mountNode) :  document.body;

  if(!visible) return null;

  const modal = <div className="mt-modal">这是弹窗11</div>;

  return createPortal(modal, targetNode);
}
