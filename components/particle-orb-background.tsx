import '@/app/styles/ParticleOrbBg.css';
export const ParticleOrbBackground = () => {
    return (
        <div className="wrap">
            {Array.from({ length: 300 }, (_, i) => (
                <div key={i} className="c"></div>
            ))}
        </div>
    );
};