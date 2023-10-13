import * as bcrypt from "bcrypt";

export class BCryptUtil {
  public static async hash(s: string): Promise<string> {
    return await bcrypt.hash(s, 10);
  }

  public static async compare(s: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(s, hash);
  }
}
