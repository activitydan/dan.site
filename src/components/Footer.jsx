import useTextScramble from '../hooks/useTextScramble';
import { useLanguage } from '../i18n/context';

function ScrambleLink({ href, children, className, ...props }) {
  const { displayText, onMouseEnter, onMouseLeave } = useTextScramble(children);
  return (
    <a 
      href={href} 
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {displayText}
    </a>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container footer-inner font-label text-gray">
        <p>{t('footer.copyright')}</p>
        <div className="social-links uppercase">
          <ScrambleLink href="https://github.com/DineshS36" className="hoverable" target="_blank" rel="noopener noreferrer">Github</ScrambleLink>
          <ScrambleLink href="https://www.linkedin.com/in/dinesh-s-173698390" className="hoverable" target="_blank" rel="noopener noreferrer">LinkedIn</ScrambleLink>
          <ScrambleLink href="https://wa.me/919345380487" className="hoverable" target="_blank" rel="noopener noreferrer">WhatsApp</ScrambleLink>
        </div>
      </div>
    </footer>
  );
}
