package com.example.dogcatserver.toss.handler;

import com.example.dogcatserver.entity.PaymentStatus;
import org.apache.ibatis.type.*;

import java.sql.*;

@MappedTypes(PaymentStatus.class)
@MappedJdbcTypes(JdbcType.VARCHAR)
public class PaymentStatusTypeHandler extends BaseTypeHandler<PaymentStatus> {

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, PaymentStatus parameter, JdbcType jdbcType) throws SQLException {
    // DB에 저장할 때 enum을 String으로 저장 (예: "PENDING", "COMPLETED" 등)
    System.out.println("🔹 Setting enum value to DB: " + parameter.name());
    ps.setObject(i, parameter.name(), Types.VARCHAR);
  }

  @Override
  public PaymentStatus getNullableResult(ResultSet rs, String columnName) throws SQLException {
    String status = rs.getString(columnName);
    return toPaymentStatus(status);
  }

  @Override
  public PaymentStatus getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
    String status = rs.getString(columnIndex);
    return toPaymentStatus(status);
  }

  @Override
  public PaymentStatus getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
    String status = cs.getString(columnIndex);
    return toPaymentStatus(status);
  }

  private PaymentStatus toPaymentStatus(String status) {
    if (status == null) {
      return null;
    }
    try {
      return PaymentStatus.valueOf(status);
    } catch (IllegalArgumentException e) {
      // 혹시 DB에 enum에 없는 값이 들어있으면 기본값 지정 가능
      return PaymentStatus.PENDING;
    }
  }
}
