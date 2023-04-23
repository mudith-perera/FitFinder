///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 20-04-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////


// Calculate the BMI value
export const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let status = '';
    let normalWeightRange = '';

    if (bmi < 18.5) {
        status = 'Underweight☹️👎';
        normalWeightRange = `(${(18.5 * heightInMeters * heightInMeters).toFixed(2)} - ${(25 * heightInMeters * heightInMeters).toFixed(2)} kg)`;
    } else if (bmi >= 18.5 && bmi <= 25) {
        status = 'Normal😊👍';
    } else {
        status = 'Overweight☹️👎';
        normalWeightRange = `(${(18.5 * heightInMeters * heightInMeters).toFixed(2)} - ${(25 * heightInMeters * heightInMeters).toFixed(2)} kg)`;
    }

    return { bmi: bmi.toFixed(1), status, normalWeightRange };
};

//Calculate the BMR value
export const calculateBMR = (gender, height, weight, age) => {
    let bmr = 0;

    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    return bmr;
};

//Calculate the body fat description
export const getBodyFatDescription = (gender, bodyFatPercentage) => {
    let description = '';
  
    if (gender === 'female') {
      if (bodyFatPercentage >= 10 && bodyFatPercentage <= 13) {
        description = 'Essential fat';
      } else if (bodyFatPercentage >= 14 && bodyFatPercentage <= 20) {
        description = 'Athletes';
      } else if (bodyFatPercentage >= 21 && bodyFatPercentage <= 24) {
        description = 'Fitness';
      } else if (bodyFatPercentage >= 25 && bodyFatPercentage <= 31) {
        description = 'Average';
      } else if (bodyFatPercentage >= 32) {
        description = 'Overweight';
      }
    } else if (gender === 'male') {
      if (bodyFatPercentage >= 2 && bodyFatPercentage <= 5) {
        description = 'Essential fat';
      } else if (bodyFatPercentage >= 6 && bodyFatPercentage <= 13) {
        description = 'Athletes';
      } else if (bodyFatPercentage >= 14 && bodyFatPercentage <= 17) {
        description = 'Fitness';
      } else if (bodyFatPercentage >= 18 && bodyFatPercentage <= 24) {
        description = 'Average';
      } else if (bodyFatPercentage >= 25) {
        description = 'Overweight';
      }
    }
  
    return description;
  };
  
