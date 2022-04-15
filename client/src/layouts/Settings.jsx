import React from 'react';
import { Radio } from 'antd';
import { useTheme } from '../hooks/useTheme';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = (v) => {
    setTheme(v.target.value);
  };

  return (
    <div className="settings__page">
      <div className="settings__page-title">Настройки</div>
      <div className="settings__page-themes">
        <div className="settings__page-themes__title">Темы</div>
        <Radio.Group
          onChange={changeTheme}
          className="settings__page-themes__list"
          name="radiogroup"
          defaultValue={Number(theme)}>
          <Radio value={1}>
            <div className="settings__page-themes__card">
              <svg
                width="155"
                height="90"
                viewBox="0 0 155 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="155" height="90" rx="8" fill="#FAFAFA" />
                <rect
                  x="67"
                  y="52"
                  width="64"
                  height="14"
                  rx="2"
                  fill="url(#paint0_linear_606_759)"
                />
                <rect
                  x="24"
                  y="24"
                  width="65"
                  height="14"
                  rx="2"
                  fill="url(#paint1_linear_606_759)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_606_759"
                    x1="67"
                    y1="59"
                    x2="131"
                    y2="59"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E5E5E5" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#E0E0E0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_606_759"
                    x1="24"
                    y1="31"
                    x2="89"
                    y2="31"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4568E8" />
                    <stop offset="1" stopColor="#7428F0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </Radio>

          <Radio value={2}>
            <div className="settings__page-themes__card">
              <svg
                width="155"
                height="90"
                viewBox="0 0 155 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="155" height="90" rx="8" fill="#292F40" />
                <rect x="67" y="52" width="64" height="14" rx="2" fill="#474747" />
                <rect x="24" y="24" width="65" height="14" rx="2" fill="#424C6D" />
              </svg>
            </div>
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default React.memo(Settings);
