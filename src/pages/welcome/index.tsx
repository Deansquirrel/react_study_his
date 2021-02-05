import localStorageItem from '@/constant/localStorageItem';
import './index.less';

const Welcome = () => {
  const token = localStorage.getItem(localStorageItem.TOKEN);
  return (
    <div>
      <h3>token</h3>
      <span>{token}</span>
    </div>
  );
};

export default Welcome;
