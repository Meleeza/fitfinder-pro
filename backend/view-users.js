import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://healthoptics:health123@cluster0.hwvg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Define User schema inline
const userSchema = new mongoose.Schema({
  email: String,
  password_hash: String,
  created_at: Date,
  updated_at: Date,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const User = mongoose.model('User', userSchema);

async function viewUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all users
    const users = await User.find({}, { password_hash: 0 }); // Exclude password hash
    
    console.log(`📊 Total Users: ${users.length}\n`);
    
    if (users.length === 0) {
      console.log('No users found. Register a user first!');
    } else {
      console.log('Registered Users:');
      console.log('='.repeat(80));
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. User ID: ${user._id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Created: ${user.created_at}`);
        console.log(`   Updated: ${user.updated_at}`);
      });
      console.log('\n' + '='.repeat(80));
    }

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

viewUsers();
