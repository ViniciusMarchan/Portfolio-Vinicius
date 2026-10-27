// A capa é interna à galeria e recebe somente variantes do catálogo local.
// eslint-disable-next-line react/prop-types
export default function ProjectVisual({ variant }) {
  return <div className={`project-visual visual-${variant}`} aria-hidden="true">
    <span className="visual-label">VM / LAB</span>
    {variant === 'payment' ? <div className="payment-diagram"><span className="diagram-node">REQUEST<br/><b>↗</b></span><i/><span className="diagram-core">P<span>PAYMENT ENGINE</span></span><i/><span className="diagram-node">EVENT<br/><b>✓</b></span><span className="diagram-caption">AUTH → PROCESS → PERSIST</span></div> : variant === 'shop' ? <div className="shop-composition"><span>THE<br/><em>NEXT</em><br/>ESSENTIAL.</span><div className="shirt">S</div><small>COLLECTION / DIGITAL COMMERCE</small></div> : <div className="gym-composition"><span>NO<br/><em>LIMITS.</em></span><div className="gym-bars"><i/><i/><i/><i/></div><small>FORÇA. MOVIMENTO. CÓDIGO.</small></div>}
    <span className="visual-caption">CAPA CONCEITUAL</span>
  </div>;
}
