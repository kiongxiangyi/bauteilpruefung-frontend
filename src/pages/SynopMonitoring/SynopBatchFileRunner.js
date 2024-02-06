const executeBatchFiles = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/SynopProgram/executeBatchFiles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    if (response.ok) {
      const result = await response.text();
      console.log(result);
      //alert('Synop programs executed successfully');
    } else {
      const errorText = await response.text();
      console.error('Error:', errorText);
      //alert('Error executing Synop programs');
    }
  } catch (error) {
    console.error('Error:', error.message);
    //alert('Internal Server Error');
  }
};

export default executeBatchFiles;
