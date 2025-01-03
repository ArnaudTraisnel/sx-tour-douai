import supabase from '../../../services/supabase'

export class AuthService {
  static async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error.message)
      throw error
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error.message)
      throw error
    }
  }

  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { user: session?.user || null }
    } catch (error) {
      console.error('Error getting session:', error.message)
      throw error
    }
  }
}
