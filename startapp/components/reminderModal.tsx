import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';
import { Plant } from '@/services/perenual';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';

type ReminderModalProps = {
  visible: boolean;
  onClose: () => void;
  plant: Plant | null;
};

const daysWeek = [
  { id: '1', label: 'Seg' },
  { id: '2', label: 'Ter' },
  { id: '3', label: 'Qua' },
  { id: '4', label: 'Qui' },
  { id: '5', label: 'Sex' },
  { id: '6', label: 'Sab' },
  { id: '7', label: 'Dom' },
];

export default function ReminderModal(props: ReminderModalProps) {
  const { visible, onClose } = props;

  const [time, setTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  function toggleDay(dayId: string) {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter((id) => id !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  }

  function onChange(event: any, selected?: Date) {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) setTime(selected);
  }

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Adicionar Lembrete</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeSelectedContainer}>
          <Text style={styles.timeLabel}>Horário selecionado</Text>
          <Text style={styles.timeValue}>{formattedTime}</Text>
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowPicker(!showPicker)}
        >
          <Text style={styles.selectButtonText}>Selecionar horário</Text>
        </TouchableOpacity>

        <View style={styles.repeatSection}>
          <Text style={styles.repeatTitle}>Repetir</Text>

          <View style={styles.daysRow}>
            {daysWeek.map((day) => (
              <TouchableOpacity
                key={day.id}
                style={styles.dayBlock}
                activeOpacity={0.7}
                onPress={() => toggleDay(day.id)}
              >
                <Checkbox
                  status={selectedDays.includes(day.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleDay(day.id)}
                  color={colors.primary}
                />
                <Text style={styles.dayText}>{day.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            is24Hour
            onChange={onChange}
            style={styles.picker}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    zIndex: 100,
  },
  modalBox: {
    width: '85%',
    height: '70%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 18,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cancelText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeSelectedContainer: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: colors.primary + '22',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  selectButton: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  repeatSection: {
    width: '100%',
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
  repeatTitle: {
    fontWeight: '700',
    fontSize: 17,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBlock: {
    alignItems: 'center',
    width: 30,
  },
  dayText: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  picker: {
    width: '100%',
    marginTop: 20,
  },
});
