import './addan-r-s-o.css'

const AddanRSO = (props) => {
  return (
    <div>
      <div className="addan-r-s-o-addan-r-s-o">
        <span className="addan-r-s-o-text">UIUC RSO&apos;s</span>
        <div className="addan-r-s-o-websitelogo">
          <div className="addan-r-s-o-group">
            <img
              src="/playground_assets/vector1736-bu48.svg"
              alt="Vector1736"
              className="addan-r-s-o-vector"
            />
            <img
              src="/playground_assets/vector1737-5lyj.svg"
              alt="Vector1737"
              className="addan-r-s-o-vector1"
            />
            <img
              src="/playground_assets/vector1737-l5mn.svg"
              alt="Vector1737"
              className="addan-r-s-o-vector2"
            />
          </div>
        </div>
        <div className="addan-r-s-o-header">
          <span className="addan-r-s-o-text1">
            <span>Home</span>
          </span>
          <span className="addan-r-s-o-text3">
            <span>RSOs</span>
          </span>
          <span className="addan-r-s-o-text5">
            <span>About</span>
          </span>
        </div>
      </div>
    </div>
  )
}
const domContainer = document.querySelector('#hehe');
const root = ReactDOM.createRoot(domContainer);
root.render(e(AddanRSO));
export default AddanRSO