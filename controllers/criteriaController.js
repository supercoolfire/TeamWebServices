async function updateCriteria(req, res) {
    try {
      const checkboxId = req.body.checkboxId;
  
      // Perform MongoDB update based on checkboxId
      // For simplicity, let's assume you have a collection named 'criteria'
      await mongodb.getDatabase().db('yourDB').collection('criteria').updateOne(
        { _id: checkboxId },
        { $set: { isChecked: true } } // You might need to adjust this based on your schema
      );
  
      res.status(200).send('Criteria updated successfully');
    } catch (error) {
      console.error('Error updating criteria:', error);
      res.status(500).send('Internal Server Error');
    }
  }