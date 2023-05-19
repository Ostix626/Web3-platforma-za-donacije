export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  
export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};
  
export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};

export const replaceWhiteSpace = (fileName) => {
  const newFileName = fileName.replace(/\s+/g, '%20');
  return newFileName;
}

export const isRealNumber = (str) => {
    // Check if the string is empty or contains only whitespace
    if (!str || !str.trim()) {
      return false;
    }
  
    // Regular expression to match a valid real number, not equal to 0
    const regex = /^[-+]?[1-9]\d*\.?\d*|[-+]?0?\.\d*[1-9]\d*$/;
  
    return regex.test(str);
  }


export const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};
  
export const strToTailwindGradient = (num) => {
  const gradients = [
    { from: 'from-pink-400', to: 'to-blue-300' },
    { from: 'from-yellow-400', to: 'to-red-300' },
    { from: 'from-green-400', to: 'to-yellow-300' },
    { from: 'from-blue-400', to: 'to-green-300' },
    { from: 'from-indigo-400', to: 'to-pink-300' },
    { from: 'from-purple-400', to: 'to-yellow-300' },
    { from: 'from-red-400', to: 'to-indigo-300' },
    { from: 'from-pink-500', to: 'to-yellow-400' },
    { from: 'from-yellow-500', to: 'to-green-400' },
    { from: 'from-green-500', to: 'to-blue-400' },
    { from: 'from-blue-500', to: 'to-indigo-400' },
    { from: 'from-indigo-500', to: 'to-purple-400' },
    { from: 'from-purple-500', to: 'to-red-400' },
    { from: 'from-red-500', to: 'to-pink-400' }
  ];
  
  const gradient = gradients[Math.abs(num) % gradients.length];
  return `${gradient.from} ${gradient.to}`;
};