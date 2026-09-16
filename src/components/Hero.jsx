import HeroGlobeButton from './HeroGlobeButton';
import { useLanguage } from '../i18n/context';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <header className="container hero-container">
      <p className="hero-elem hero-subtitle font-label uppercase">
        {t('hero.subtitle')}
      </p>
      <h1 className="hero-elem hero-title-1 uppercase text-glow-intense glitch-wrapper" data-text="WEB">
        WEB
      </h1>
      <h1 className="hero-elem hero-title-2 uppercase">DEVELOPER</h1>
      
      <div className="hero-elem hero-globe-wrapper">
        <HeroGlobeButton />
      </div>
    </header>
  );
}
