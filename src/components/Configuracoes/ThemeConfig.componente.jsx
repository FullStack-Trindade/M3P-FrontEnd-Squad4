import React, { useState } from 'react';

const ThemeConfig = () => {
  const [companyName, setCompanyName] = useState('Nome do Aplicativo');
  const [slogan, setSlogan] = useState('Slogan do Aplicativo');
  const [colorPalette, setColorPalette] = useState('#00AABB');
  const [logoImage, setLogoImage] = useState(null);

  const handleSave = () => {
    // Lógica para salvar as configurações de tema
  };

  return (
    <div className="theme-config">
      <h1>Configuração de Tema</h1>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Nome da Empresa</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Slogan (opcional)</label>
          <input
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Palheta de Cores</label>
          <input
            type="color"
            value={colorPalette}
            onChange={(e) => setColorPalette(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Imagem do Logotipo</label>
          <input
            type="file"
            onChange={(e) => setLogoImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Salvar Configurações</button>
      </form>
    </div>
  );
};

export default ThemeConfig;
