import { auth } from '@clerk/nextjs/server'; // Updated import path

type UserType = 'LANDLORD' | 'TENANT' | 'PROPERTY_MANAGER' | 'ADMIN';
interface AuthData {
  userId : string | null;
  sessionClaims : {
    metadata : {
      userType? : UserType;
    }
  }
}

export const getAuthData = async () : Promise<AuthData> => {
  const {userId, sessionClaims} = await auth();
  return {
    userId,
    sessionClaims : {
      metadata : {
        userType: sessionClaims?.metadata?.userType as UserType | undefined,
      }
    }
  }
}

// Helper to get current user's role
export const getCurrentRole = async (): Promise<UserType | undefined> => {
  const { sessionClaims } = await getAuthData();
  return sessionClaims?.metadata.userType;
};

// Role checking middleware helper
export const checkRole =  async (requiredRole: UserType) : Promise<boolean> => {
  const { sessionClaims } = await getAuthData();
  return sessionClaims?.metadata.userType === requiredRole;
};

// User ID helper
export const getCurrentUserId = async () : Promise<string | null> => {
  const { userId } = await getAuthData();
  return userId;
};