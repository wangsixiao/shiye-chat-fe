import './index.css'
export default function ClearFloat() {
  return (
    <div className="clear-float">
      <div className="float-left">浮动子元素1</div>
      <div className="float-right">浮动子元素2</div>
      <div className="clear-both"></div>
    </div>
  );
}
